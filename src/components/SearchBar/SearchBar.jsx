import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Header, Input, SubmitBtn } from './SearchBar.styled';

function SearchBar({ onSubmit}) {
  const [searchQuerry, setSearchQuerry] = useState('');

  const handleSearchQuerry = event => {
    setSearchQuerry(event.target.value.toLowerCase());
  };
  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuerry.trim() === '') {
      return toast.error('Search querry can not be empty!');
    }
    onSubmit(searchQuerry);

    setSearchQuerry('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SubmitBtn type="submit">
          <span>Search</span>
        </SubmitBtn>

        <Input
          value={searchQuerry}
          onChange={handleSearchQuerry}
          name="searchQuerry"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
}

export { SearchBar };
