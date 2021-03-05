import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { saga } from './saga';
import { key, countryReducer } from './reducer';
import { actions } from './actions';
import { selectCountryItem, selectLoading, selectError } from './selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { PageWrapper } from 'app/components/PageWrapper';

export function Country(props) {
  const {
    match: {
      params: { id },
    },
  } = props;

  useInjectReducer({ key: key, reducer: countryReducer });
  useInjectSaga({ key: key, saga });

  const currencyCode = useSelector(selectCountryItem('currency_code'));
  const name = useSelector(selectCountryItem('name'));
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchCountry(id));
  }, [dispatch, id]);

  return (
    <PageWrapper>
      <h1>{name || 'Not Found'}</h1>
      {isLoading && <LoadingIndicator small />}
      {currencyCode ? (
        <CurrencyCode>Currency Code: {currencyCode}</CurrencyCode>
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : null}
    </PageWrapper>
  );
}

const CurrencyCode = styled.p`
  color: blue;
`;

const ErrorText = styled.span`
  color: red;
`;
