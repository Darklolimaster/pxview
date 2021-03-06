import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useScrollToTop } from '@react-navigation/native';
import TagList from '../../components/TagList';
import SimpleTagList from '../../components/SimpleTagList';
import {
  clearTrendingIllustTags,
  fetchTrendingIllustTags,
} from '../../common/actions/trendingIllustTags';
import { getTrendingIllustTagsItems } from '../../common/selectors';
import { SEARCH_TYPES } from '../../common/constants';

const TrendingIllustTags = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const allState = useSelector((state) => state);
  const trendingIllustTags = useSelector((state) => state.trendingIllustTags);
  const { isShowIllustImage } = useSelector(
    (state) => state.trendingSearchSettings,
  );
  const items = getTrendingIllustTagsItems(allState);
  useScrollToTop(ref);

  useEffect(() => {
    if (!trendingIllustTags.loaded) {
      dispatch(clearTrendingIllustTags());
      dispatch(fetchTrendingIllustTags());
    }
  }, [dispatch, trendingIllustTags.loaded]);

  const handleOnRefresh = () => {
    dispatch(clearTrendingIllustTags());
    dispatch(fetchTrendingIllustTags(null, true));
  };

  const Comp = isShowIllustImage ? TagList : SimpleTagList;
  return (
    <Comp
      ref={ref}
      data={{ ...trendingIllustTags, items }}
      onRefresh={handleOnRefresh}
      searchType={SEARCH_TYPES.ILLUST}
    />
  );
};

export default TrendingIllustTags;
