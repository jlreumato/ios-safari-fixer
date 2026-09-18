create policy "Transformador videos readable"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'transformador');

create policy "Admins upload transformador videos"
on storage.objects for insert
to authenticated
with check (bucket_id = 'transformador' and public.has_role(auth.uid(), 'admin'));

create policy "Admins update transformador videos"
on storage.objects for update
to authenticated
using (bucket_id = 'transformador' and public.has_role(auth.uid(), 'admin'));

create policy "Admins delete transformador videos"
on storage.objects for delete
to authenticated
using (bucket_id = 'transformador' and public.has_role(auth.uid(), 'admin'));
