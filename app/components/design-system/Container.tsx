import { createStyles } from 'antd-style';
import * as React from 'react';

const useStyles = createStyles(() => ({
    container: {
        maxWidth: 990,
        margin: '0 auto',
    },
}));

export interface ContainerProps {
    children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
    const { styles, cx } = useStyles({ enabled: true });
    return <div className={cx(styles.container)}>{children}</div>;
};
