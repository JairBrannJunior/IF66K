export async function login(email: string, password: string) {
    return await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
        })            
        .then(response => {
            return response.json() as any;
        });
}