type Post = {
  userId: string;
  id: string;
  title: string;
  body: string;
};

type Album = {
  userId: string;
  id: string;
  title: string;
};

async function getUserPosts(userId: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  return (await response.json()) as Post[];
}

async function getUserAlbums(userId: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
  );
  return (await response.json()) as Album[];
}

export default async function UserParallel({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: userId } = await params;
  const postsData = getUserPosts(userId);
  const albumsData = getUserAlbums(userId);
  const [posts, albums] = await Promise.all([postsData, albumsData]);

  return (
    <section className="p-5">
      <h1 className="text-5xl text-white font-bold mb-16">User Profile</h1>

      <div className="flex gap-10 justify-center">
        <ShowUserPosts posts={posts} />
        <ShowUserAlbums albums={albums} />
      </div>
    </section>
  );
}

const ShowUserPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="w-[48%]">
      <h2 className="font-semibold text-4xl text-white mb-4">Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-10 space-y-3 bg-white rounded-md text-black"
          >
            <h1 className="font-bold text-2xl">{post.title}</h1>
            <p className="text-gray-800">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShowUserAlbums = ({ albums }: { albums: Album[] }) => {
  return (
    <div className="w-[48%]">
      <h2 className="font-semibold text-4xl text-white mb-4">Albums</h2>
      <div className="space-y-4">
        {albums.map((album) => (
          <div key={album.id} className="p-10 bg-white rounded-md">
            <p className="text-gray-800">{album.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
