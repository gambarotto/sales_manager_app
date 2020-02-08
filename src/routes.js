import { createSwitchNavigator ,createAppContainer } from 'react-navigation'

import Main from './screens/Main'
import Entry from './screens/Entry'
import Loading from './screens/Loading'

const AppStack = createSwitchNavigator({
    Main,
    Entry,
    Loading,
},{
    initialRouteName:'Loading',
    backBehavior:'history'
})

const Routes = createAppContainer(AppStack)

export default Routes