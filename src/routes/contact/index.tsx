import { component$, $, QRL, QwikChangeEvent, useSignal, Signal } from '@builder.io/qwik';
import styles from './contact.module.css';

interface Contact {
    id: number;
    medium: string;
    details: string;
}

export const contactData: Contact[] = [
    { id: 0, medium: 'none', details: 'veuillez choisir un mode de communication' },
    { id: 1, medium: 'email', details: 'contact@greatcompany.com' },
    { id: 2, medium: 'phone', details: '06 07 08 09 10' },
    { id: 3, medium: 'address', details: '1 rue de la République, Quickville' },
]

export default component$(() => {
    const contactMediumSignal: Signal<Contact> = useSignal({ id: 0, medium: '---', details: '' });

    const handleContact = $((e: QwikChangeEvent) => {
        const mediumValue = (e.target as any).value;
        // console.log({ mediumValue });
        const contactMedium: Contact = contactData.find(item => item.medium === mediumValue) as Contact;
        // console.log({ contactMedium });
        contactMediumSignal.value = contactMedium;
    });
    return (
        <div class="container">
            <h3 class={styles.spacer}>Contact</h3>
            <ContactSelect handleChange={handleContact} />
            <ContactDetails contact={contactMediumSignal.value} />
        </div>
    )
});

interface ContactSelectProps {
    handleChange: QRL<(e: QwikChangeEvent<HTMLSelectElement>) => void>;
}

export const ContactSelect = component$((props: ContactSelectProps) => {
    const handleChange = props.handleChange;
    return (
        <select onChange$={handleChange}>
            <option value="none">---</option>
            <option value="email">email</option>
            <option value="phone">téléphone</option>
            <option value="address">adresse</option>
        </select>
    )
});

export const ContactDetails = component$((props: { contact: Contact }) => {
    const contact = props.contact;
    return (
        <div class={styles.contactdetails}>
            {contact.details}
        </div>
    )
})
