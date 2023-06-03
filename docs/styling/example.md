```tsx
import { createStyles } from 'antd-style';

const useStyles = createStyles<{ enabled: boolean }>(
    ({ token }, { enabled }) => ({
        // 支持 css object 的写法
        container: {
            backgroundColor: token.colorBgLayout,
            borderRadius: token.borderRadiusLG,
            maxWidth: 400,
            width: '100%',
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }),
);

const { styles, cx, theme } = useStyles({ enabled: true });
```
