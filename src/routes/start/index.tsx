import { QwikChangeEvent, component$, $, useSignal } from '@builder.io/qwik';
import { Form, routeAction$ } from '@builder.io/qwik-city';

type Techno = {
    id: number,
    technoName: string,
    technoType: string,
    isNextGen: boolean
}

let technos: Techno[] = [];

export const useAddTechno = routeAction$(async (data, requestEvent) => {
    console.log({ data });

    let techno: Techno;
    const result = new Promise<Techno>((resolve) => {
        const id = Date.now();
        const { technoname, technotype, isnextgen } = data;
        techno = {
            id,
            technoName: String(technoname),
            technoType: String(technotype),
            isNextGen: Boolean(isnextgen)
        };
        technos = [techno, ...technos];
        resolve(techno);
    })

    return {
        success: true,
        result
    };
})

export default component$(() => {
    const technoTypeSignal = useSignal('');
    const technoNameSignal = useSignal('');
    const isNextGenSignal = useSignal(false);
    const action = useAddTechno();

    const handleChange = $((e: QwikChangeEvent<HTMLSelectElement>) => {
        const technoType = (e.target as HTMLSelectElement).value;
        technoTypeSignal.value = technoType;
    });

    const handleName = $((e: Event) => {
        const technoName = (e.target as HTMLInputElement).value;
        technoNameSignal.value = technoName;
    });

    const handleIsNextGen = $((e: QwikChangeEvent<HTMLInputElement>) => {
        const isNextGen = (e.target as HTMLInputElement).checked;
        isNextGenSignal.value = isNextGen;
        console.log(isNextGen);
    });

    const resetForm = $(() => {
        technoTypeSignal.value = '';
        technoNameSignal.value = '';
        isNextGenSignal.value = false;
    });

    return (
        <div class="container container-center container-spacing-xl">
            <h3>Quelle techno apprendre ?</h3>
            <br />
            <Form action={action} onSubmitCompleted$={resetForm}>
                <div>
                    <label for="technotype">Type de techno</label>
                    <br />
                    <br />
                    <select id="technotype" name="technotype" onChange$={e => handleChange(e)} bind:value={technoTypeSignal}>
                        <option value="">choisir</option>
                        <option value="front">front</option>
                        <option value="back">back</option>
                        <option value="full-stack">full-stack</option>
                        <option value="autre">autre</option>
                    </select>
                </div>
                <div>
                    {technoTypeSignal.value}
                </div>

                <br />

                <div>
                    <label for="technoname">Nom de la techno</label>
                    <br />
                    <br />
                    <input type="text" id="technoname" name="technoname" onInput$={e => handleName(e)} bind:value={technoNameSignal}/>
                </div>

                <div>
                    <br />
                    <br />
                    <br />
                    {technoNameSignal.value}
                </div>

                <br />
                <br />
                <div>
                    <label for="isnextgen">Est un framework /lib next-gen :</label>
                    <input type="checkbox" id="isnextgen" name="isnextgen" onChange$={e => handleIsNextGen(e)} checked={isNextGenSignal.value}/>
                </div>
                <br />
                <div>
                    Est next-gen : {isNextGenSignal.value ? 'next-gen' : 'établi'}
                </div>
                <input type="submit" value="ajouter" />
            </Form>
            {action.value?.success && (
                <p>{JSON.stringify(action.value.result, null, 2)}</p>
            )}
        </div>
    )
})