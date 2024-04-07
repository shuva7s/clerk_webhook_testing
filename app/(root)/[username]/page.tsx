
export default function User({ params }: { params: { username: string } }) {
    const { username } = params;
    return (
        <h1>{username}</h1>
    )
}