import { component$, useResource$, Resource, useStylesScoped$ } from '@builder.io/qwik';
import styles from './users.css?inline';
import UserList from '~/components/user-list';

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface Geo {
    lat: string;
    lng: string;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

const URL = 'https://jsonplaceholder.typicode.com/users';

export default component$(() => {
    const usersResource = useResource$<User[]>(async () => {
        const result = await fetch(URL);
        return result.json();
    });

    useStylesScoped$(styles);

    return (
        <div class="container">
            <h3 class="spacer">Utilisateurs</h3>
            <div>
                <Resource
                    value={usersResource}
                    onResolved={(users) => (<div><UserList users={users} /></div>)}
                    onPending={() => (<span>loading...</span>)}
                    onRejected={(reason) => (<span>erreur : {reason}</span>)}
                />

            </div>
        </div>
    )
});