import { Player } from 'interfaces/player';
import { RefObject, useEffect, useRef } from 'react';

export const useTieColor = ({ id, color }: Player) => {
    const tieRef: RefObject<SVGSVGElement> = useRef(null);

    useEffect(() => {
        if (tieRef.current) {
            const paths = tieRef.current.querySelectorAll('path');
            paths.item(0)?.setAttribute('fill', `url(#grad1_tie${id})`);
            paths.item(1)?.setAttribute('fill', `url(#grad2_tie${id})`);

            const gradients = tieRef.current.querySelectorAll('linearGradient');
            gradients.item(0)?.setAttribute('id', `grad1_tie${id}`);
            gradients.item(1)?.setAttribute('id', `grad2_tie${id}`);

            gradients.item(0)?.querySelector('stop')?.setAttribute('stop-color', color);
            gradients.item(1)?.querySelector('stop')?.setAttribute('stop-color', color);
        }
    }, [id, color, tieRef]);

    return tieRef;
};
