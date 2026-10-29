BEGIN;

INSERT INTO public.experiences (
  company_name,
  role,
  start_date,
  is_current,
  description,
  published,
  sort_order
)
SELECT
  'Ahaz Platforms',
  'Python Instructor (Part-time)',
  DATE '2026-07-01',
  true,
  $description$Instructed students of all levels in Python using structured lessons and practical exercises. Covered basic topics (variables, data types, control flow, functions), intermediate subjects (data structures, file handling, OOP), and advanced concepts. Created coding challenges to reinforce learning, improve problem-solving skills, and boost confidence. Analyzed student code, offered constructive feedback, and supported debugging to help students grasp the underlying causes of errors.$description$,
  true,
  0
WHERE NOT EXISTS (
  SELECT 1
  FROM public.experiences
  WHERE company_name = 'Ahaz Platforms'
    AND role = 'Python Instructor (Part-time)'
    AND start_date = DATE '2026-07-01'
);

COMMIT;
