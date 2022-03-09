import { RefObject, useEffect, useRef } from 'react';

export const useTieColor = (color: string) => {
    const tieRef: RefObject<SVGSVGElement> = useRef(null);

    useEffect(() => {
        if (tieRef.current) {
            const elem1 = tieRef.current.querySelector('#place1');
            const elem2 = tieRef.current.querySelector('#place2');
            elem1?.setAttribute('stop-color', color);
            elem2?.setAttribute('stop-color', color);
        }
    }, [tieRef]);

    return tieRef;
};
