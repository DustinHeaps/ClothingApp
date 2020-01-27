import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import { createStructuredSelector } from 'reselect';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import Spinner from '../../components/spinner/spinner.component';

const CollectionsOverview = lazy(() => import('../../components/collections-overview/collections-overview.component'));
const CollectionPage = lazy(() => import('../collection/collection.component'));

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ fetchCollectionsStart, match, isCollectionFetching, isCollectionsLoaded }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart])



    return (
      <div className="shop-page">
        <Suspense fallback={<Spinner />}>
          <Route
            exact
            path={`${match.path}`}
            render={props => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />}
          />
          <Route
            path={`${match.path}/:collectionId`}
            render={props => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />}
          />
        </Suspense>
      </div>
    );
  }


const mapStateToProps = createStructuredSelector({
  
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});

export default connect(
  mapStateToProps,
  { fetchCollectionsStart }
)(ShopPage);
