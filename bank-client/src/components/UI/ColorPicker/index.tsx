import cn from 'classnames';
import { useCallback, useEffect, useState, VFC } from 'react';
import styles from './index.module.sass';

interface Props {
    defaultColor: string;
    colors: Array<string>;
    onChange?: (color: string) => void;
    className?: string;
    name?: string;
}

export const ColorPicker: VFC<Props> = ({
    colors,
    className,
    defaultColor,
    onChange,
    name,
}: Props) => {
    const [color, setColor] = useState<string>(defaultColor);

    useEffect(() => {
        if (colors.length) {
            setColor(colors[0]);
        }
    }, [colors]);

    useEffect(() => {
        onChange?.(color);
    }, [color]);

    const handleColorChange = useCallback(() => {
        const index = colors.indexOf(color);
        let nextIndex: number;
        if (index === colors.length - 1) {
            nextIndex = 0;
        } else {
            nextIndex = index + 1;
        }
        const nextColor = colors[nextIndex];
        setColor(nextColor);
        onChange?.(nextColor);
    }, [color, colors]);

    return (
        <label
            className={cn(styles.colorPicker, className)}
            style={{ backgroundColor: color }}
            onClick={handleColorChange}
        >
            <input value={color} className={styles.input} name={name} />
        </label>
    );
};
