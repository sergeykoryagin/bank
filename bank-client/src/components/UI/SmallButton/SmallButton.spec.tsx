import { render, screen } from '@testing-library/react';
import { SmallButton } from 'components/UI/SmallButton/index';
import { Props } from 'components/UI/SmallButton/index';

const testprops: Props = {
    icon: true,
    text: 'testtext',
};

const testprops2: Props = {
    className: 'classname',
    icon: true,
    text: 'testtext',
};

describe('PlayerComponent', () => {
    it('should render with text, icon', () => {
        render(<SmallButton {...testprops} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
    it('should render with text, icon, classname', () => {
        render(<SmallButton {...testprops2} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
