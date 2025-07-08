type Author = {
  id: number;
  name: string;
};

export default async function Author({ userId }: { userId: number }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const user = (await response.json()) as Author;

  return (
    <div className="text-gray-500">
      Written by:{" "}
      <span className="font-semibold  text-gray-800">{user.name}</span>
    </div>
  );
}
