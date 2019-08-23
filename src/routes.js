import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from '~/pages/Main';
import Login from '~/pages/Login';
import SignUp from '~/pages/SignUp';
import Perfil from '~/pages/Perfil';
import PlantList from '~/pages/PlantList';
import PlantAbout from '~/pages/PlantAbout';
import PlantCreate from '~/pages/PlantCreate';

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Main,
      Login,
      Perfil,
      PlantList,
      PlantAbout,
      PlantCreate,
      SignUp,
    },
    {
      initialRouteName: 'Login',
    },
  ),
);

export default Routes;
