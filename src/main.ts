const postName: HTMLInputElement = document.querySelector('#postName') as HTMLInputElement;
const postAddButton: HTMLButtonElement = document.querySelector('button') as HTMLButtonElement;
const postsContainer: HTMLElement = document.querySelector('#postsContainer') as HTMLElement;

interface PostsInterface {
    id: number,
    title: string,
}

const loadPosts = async () => {
    try {
        const res = await fetch('http://localhost:8000/posts');
        
        if (!res.ok) throw new Error(`Błąd: ${res.statusText}`);

        const data: PostsInterface[] = await res.json();

        data.forEach((post: PostsInterface ) => {
            const postElement: HTMLElement = document.createElement('li');
            postElement.textContent = `${post.id}. ${post.title}`;
            postsContainer.appendChild(postElement);
        });
    } catch (err: any) {
        console.error(`${err.message}`);
    }
}

loadPosts();

postAddButton.addEventListener('click', async (e: Event) => {
    e.preventDefault();

    try {
        const res = await fetch('http://localhost:8000/posts', {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({postName: postName.value})
        });

        if (!res.ok) throw new Error(`Błąd: ${res.statusText}`);

        const data: PostsInterface = await res.json();

        const postElement: HTMLElement = document.createElement('li');
        postElement.textContent = `${data.id}. ${data.title}`;
        postsContainer.appendChild(postElement);

        postName.value = '';
    } catch (err: any) {
        console.error(`${err.message}`);
    }
});