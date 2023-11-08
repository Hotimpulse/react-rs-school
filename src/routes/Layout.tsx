import React from 'react';
import { Outlet } from 'react-router-dom';
import PokemonComponent from '../components/PokemonComponent';

const Layout: React.FC = () => {
  return (
    <div className="flex">
      <div>
        <PokemonComponent />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
