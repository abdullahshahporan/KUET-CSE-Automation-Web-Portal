-- ============================================================
-- Push Notification Diagnostic & Fix Script
-- Run this in Supabase SQL Editor to diagnose and repair the
-- push notification pipeline.
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- STEP 1: Check if the outbox trigger is installed
-- ─────────────────────────────────────────────────────────────
SELECT
  trigger_name,
  event_object_table,
  action_timing,
  event_manipulation
FROM information_schema.triggers
WHERE trigger_name = 'trg_notifications_push_outbox';

-- If no row above, run STEP 2 to create it.

-- ─────────────────────────────────────────────────────────────
-- STEP 2: (Re)install the outbox trigger (safe to run anytime)
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.enqueue_notification_push_outbox()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.notification_push_outbox (notification_id, status)
  VALUES (NEW.id, 'pending')
  ON CONFLICT (notification_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notifications_push_outbox ON public.notifications;

CREATE TRIGGER trg_notifications_push_outbox
AFTER INSERT ON public.notifications
FOR EACH ROW
EXECUTE FUNCTION public.enqueue_notification_push_outbox();

-- ─────────────────────────────────────────────────────────────
-- STEP 3: Check how many outbox rows exist in each status
-- ─────────────────────────────────────────────────────────────
SELECT status, COUNT(*) AS count
FROM public.notification_push_outbox
GROUP BY status
ORDER BY status;

-- ─────────────────────────────────────────────────────────────
-- STEP 4: Reset any rows stuck in 'processing' (crashed dispatch)
-- ─────────────────────────────────────────────────────────────
UPDATE public.notification_push_outbox
SET status = 'pending', updated_at = now()
WHERE status = 'processing'
  AND updated_at < now() - interval '5 minutes';

-- ─────────────────────────────────────────────────────────────
-- STEP 5: Backfill outbox for any notifications that have no
--         outbox row (missed by trigger or created before it was installed)
-- ─────────────────────────────────────────────────────────────
INSERT INTO public.notification_push_outbox (notification_id, status)
SELECT n.id, 'pending'
FROM public.notifications n
LEFT JOIN public.notification_push_outbox o ON o.notification_id = n.id
WHERE o.id IS NULL
  AND n.created_at >= now() - interval '7 days'; -- only last 7 days
-- ON CONFLICT already handled by the UNIQUE constraint

-- ─────────────────────────────────────────────────────────────
-- STEP 6: Verify pending items ready to dispatch
-- ─────────────────────────────────────────────────────────────
SELECT
  o.id AS outbox_id,
  o.status,
  o.attempts,
  o.last_error,
  o.created_at,
  n.type AS notification_type,
  n.title,
  n.target_type
FROM public.notification_push_outbox o
JOIN public.notifications n ON n.id = o.notification_id
WHERE o.status IN ('pending', 'processing', 'failed')
ORDER BY o.created_at DESC
LIMIT 20;
