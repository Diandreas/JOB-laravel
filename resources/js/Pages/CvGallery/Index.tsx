import { Link } from '@inertiajs/react';

const Index = ({ models }) => {
    return (
        <div>
            <h1>Galerie de CV</h1>
            <ul>
                {models.map(model => (
                    <li key={model.id}>
                        <Link href={route('cv-gallery.show', model.viewPath)}>
                            {model.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
