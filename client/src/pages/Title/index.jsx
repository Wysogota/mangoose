import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { get, isEmpty } from 'lodash';
import cx from 'classnames';
import ColBlock from '../../components/Blocks/ColBlock';
import MainHeader from '../../components/Headers/MainHeader';
import TitleTabs from './TitleTabs';
import Cover from '../../components/Title/Cover';
import TitleInfoList from './TitleInfoList';
import ReadingButtonsBlock from '../../components/Title/ReadingButtonsBlock';
import { useAdaptiveView, useLoading } from '../../hooks';
import { getLocaleValue, getPageTitle, selectRelationship } from '../../common/functions';
import styles from './Title.module.scss';
import CONSTANTS from '../../constants';
const {
  breakpoints: { lg },
  DEFAULT_LOCALE,
  PAGES: { TITLE: { name } },
  MANGA_COVER_SIZES: { RAW }
} = CONSTANTS;

const Title = () => {
  const { manga, isFetching } = useSelector(({ manga }) => manga);
  const { getManga } = bindActionCreators(actionCreators, useDispatch());

  const { mangaId } = useParams();
  useEffect(() => getManga({ mangaId }), [mangaId]);

  useEffect(() => {
    document.title = isEmpty(manga)
      ? getPageTitle(name)
      : getPageTitle(getLocaleValue(manga.attributes.title));
  }, [manga]);

  const isAdaptiveView = useAdaptiveView(lg);

  const loading = useLoading({ data: manga, title: 'Manga Not Found', isFetching });
  if (loading) return loading;

  const {
    relationships,
    attributes: {
      title, description, tags, altTitles, status,
      lastChapter, publicationDemographic, year,
    },
  } = manga;

  const filteredAltTitles = [
    ...altTitles
      .filter((item) => item[DEFAULT_LOCALE])
      .map((item) => item[DEFAULT_LOCALE])
  ];

  const { cover_art, author, artist } = selectRelationship(relationships, ['cover_art', 'author', 'artist']);
  const coverUrl = get(cover_art, 'attributes.urls')[RAW];
  const authorName = get(author, 'attributes.name');
  const atristName = get(artist, 'attributes.name');

  const titleInfoAttr = {
    status, lastChapter, publicationDemographic, year, authorName, atristName
  };

  const coverBlockClasses = cx(
    'col-12 col-lg-4 col-xxl-3',
    isAdaptiveView && 'm-auto',
  );

  const tabBlockClasses = cx(
    'col-12 col-lg-8 col-xxl-9',
    isAdaptiveView && styles.block_mobile
  );

  const coverClasses = cx(
    isAdaptiveView && 'col-8 col-sm-6 m-auto'
  );

  return (
    <Container>
      <Row className='justify-content-between'>
        <ColBlock className={coverBlockClasses}>
          <Cover image={coverUrl} alt={getLocaleValue(title)} className={coverClasses} />
          {!isAdaptiveView &&
            <>
              <ReadingButtonsBlock />
              <TitleInfoList attributes={titleInfoAttr} />
            </>
          }
        </ColBlock>
        <ColBlock className={tabBlockClasses}>
          <Col>
            <MainHeader className='fs-1'>{getLocaleValue(title)}</MainHeader>
            <MainHeader className='fs-6'>{filteredAltTitles.join(' | ')}</MainHeader>
          </Col>
          <Col>
            <TitleTabs
              desc={getLocaleValue(description)} tags={tags}
              relationships={relationships} titleInfoAttr={titleInfoAttr}
            />
          </Col>
        </ColBlock>
      </Row>
      {isAdaptiveView && <ReadingButtonsBlock isAdaptiveView />}
    </Container>
  );
};

export default Title;
