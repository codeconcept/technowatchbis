import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { User } from '..';

export const userDetails = routeLoader$(async (requestEvent) => {
    const uid = requestEvent.params.uid;
    // this code runs server side only
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${uid}`);
    const user = await res.json();
    console.log({ user });
    if (Object.keys(user).length === 0) {
        console.log('Utilisateur NON existant');
        return requestEvent.fail(404, { errorMessage: 'Désolé, utilisateur non trouvé' });
    }
    return user;
})


export default component$(() => {
    const userSignal = userDetails();
    if(userSignal.value.failed) {
        return (
            <div class="container">
                <h3>Une erreur s'est produite</h3>
                <div>{(userSignal.value).errorMessage}</div>
                <Link href="/users">retour</Link>
            </div>
        )
    }
    const { id, name, email, phone, website } = userSignal.value as User;

    return (
        <div class="container">
            <h3>Détails de {id}</h3>
            <div>
                nom : {name} <br />
                email : {email} <br />
                tél : {phone} <br />
                web : {website} <br />
            </div>
            <Link href='/users'>retour</Link>
        </div>
    )
})