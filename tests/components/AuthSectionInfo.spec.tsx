import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthSectionInfo from '../../src/components/AuthSectionInfo';
import '@testing-library/jest-dom/extend-expect';

describe('Component: WorkCard', () => {
  it('Should render the work card content', () => {
    render(<AuthSectionInfo />);

    expect(screen.getByAltText('Daily organization')).toBeInTheDocument();
    expect(screen.getByText('Organize sua daily e não deixe mais nada passar batido na cerimônia')).toBeInTheDocument();
    expect(screen.getByAltText('Past dailies')).toBeInTheDocument();
    expect(screen.getByText('Consulte o que você fez em dias anteriores')).toBeInTheDocument();
    expect(screen.getByAltText('Team meeting')).toBeInTheDocument();
    expect(screen.getByText('Não se enrole mais com o que você fez e melhore a compreensão de seus colegas de time')).toBeInTheDocument();
  });
});
