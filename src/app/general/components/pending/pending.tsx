import {Flex, Spin} from 'antd';
import {useTheme} from 'antd-style';

export const Pending = () => {
  const {paddingLG} = useTheme();
  return (
    <Flex justify='center' style={{padding: paddingLG}}>
      <Spin style={{margin: 'auto'}} />
    </Flex>
  );
};
