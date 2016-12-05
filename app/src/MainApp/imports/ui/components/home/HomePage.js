/* @flow */
import React from 'react';
import {
    Block,
    Image,
    Link,
    PageHeader,
    SwitchTheme,
    Title,
    View,
} from '../../../../client/app/components';


const HomePage = () => (
    <View>
        <Title message="MRRWS" />
        <PageHeader
          description="Starter kit for universal full–fledged React apps."
          heading="MRRWS"
        />
            {/* This is a block with margin-bottom: scale[4]. Inline styles rocks. */}
        <Block mb={4}>
            <Link to="https://github.com/cdmbase/meter-react-redux-webpack-starter-kit">
                github.com/cdmbase/meter-react-redux-webpack-starter-kit
            </Link>
        </Block>
        <SwitchTheme />
        <Image
          alt="50x50 placeholder"
          mt={2}
          src={require('./50x50.png')}
        />
    </View>
);

export default HomePage;
