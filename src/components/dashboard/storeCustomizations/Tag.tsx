export default function Tag_Hr({ name }: { name: string }) {
  return (
    <div className="my-6">
      <h1 className="font-semibold text-xl opacity-80">{name}</h1>
      <hr className="border-2 bg-primary-foreground mt-2" />
    </div>
  );
}
