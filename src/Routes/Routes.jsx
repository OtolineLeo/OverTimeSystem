import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { WelcomePage } from '../pages/welcome/welcome';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/homepage/homepage';
import { DaysInARowPage } from '../pages/daysinarowpage/daysinarow';

export function Routes() {
  return (
    <RouterRoutes>
      <Route path='/' element={<WelcomePage />} />
      <Route path='/homepage' element={<HomePage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/daysinarow' element={<DaysInARowPage />} />
    </RouterRoutes>
  );
}