import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { User } from '~/routes/users';

interface UsersProps {
    users: User[];
}

export default component$((props: UsersProps) => {
    const users = props.users;
    return (
        <div class="container">
            {users && (users.map(usr => (
                <>
                    <div key={usr.id}>
                        <h4>{usr.name}</h4>
                        <div>
                            User Name : {usr.username} <br />
                            Entreprise : {usr.company.name} <br />
                            Email : {usr.email} <br />
                            <br />
                            <Link href={`/users/${usr.id}`}>détails de {usr.name}</Link>
                        </div>
                    </div>
                </>
            )))}
        </div>
    )
})