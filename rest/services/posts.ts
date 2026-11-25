export type Post = {
  id: number;
  title: string;
  body: string;
};

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(POSTS_URL);
  if (!response.ok) {
    throw new Error(`Could not load posts (${response.status}).`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Posts response was not a list.');
  }

  return data.flatMap(item => {
    if (
      item == null ||
      typeof item !== 'object' ||
      typeof item.id !== 'number' ||
      typeof item.title !== 'string' ||
      typeof item.body !== 'string'
    ) {
      return [];
    }

    return [{ id: item.id, title: item.title, body: item.body }];
  });
}
