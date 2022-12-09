export async function register(email: string, password: string, name: string) {
    return await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, name}),
        })            
        .then(response => {
            return response.json() as any;
        });
}