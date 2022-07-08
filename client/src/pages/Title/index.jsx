import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import cx from 'classnames';
import ColBlock from '../../components/Blocks/ColBlock';
import MainHeader from '../../components/Headers/MainHeader';
import TitleTabs from './TitleTabs';
import Cover from '../../components/Title/Cover';
import TitleInfoList from './TitleInfoList';
import ReadingButtonsBlock from '../../components/Title/ReadingButtonsBlock';
import { useAdaptiveView } from '../../hooks';
import { selectRelationship } from '../../common/functions';
import styles from './Title.module.scss';
import CONSTANTS from '../../constants';
const { breakpoints: { lg } } = CONSTANTS;

const Title = () => {
  const { manga, isFetching } = useSelector(({ manga }) => manga);
  const { getManga } = bindActionCreators(actionCreators, useDispatch());

  const { mangaId } = useParams();
  useEffect(() => getManga({ mangaId }), [mangaId]);

  const isAdaptiveView = useAdaptiveView(lg);

  if (isEmpty(manga) || isFetching) {
    return (
      <Container>
        <Row>
          <Col>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );

  } else {

    const {
      attributes: {
        title: { [CONSTANTS.DEFAULT_LOCALE]: title }, //TODO если пусто тогда искать первое что не пусто
        description: { [CONSTANTS.DEFAULT_LOCALE]: desc },
        tags,
      },
      attributes,
      relationships,
    } = manga;

    const altTitles = [
      ...attributes.altTitles
        .filter((item) => item[CONSTANTS.DEFAULT_LOCALE])
        .map((item) => item[CONSTANTS.DEFAULT_LOCALE])
    ];

    const {
      cover_art: { attributes: { url: coverUrl } },
      author: { attributes: { name: authorName } },
      artist: { attributes: { name: atristName } }
    } = selectRelationship(relationships, ['cover_art', 'author', 'artist']);

    const { status, lastChapter, publicationDemographic, year } = attributes;
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
            <Cover image={coverUrl} alt={title} className={coverClasses} />
            {!isAdaptiveView &&
              <>
                <ReadingButtonsBlock />
                <TitleInfoList attributes={titleInfoAttr} />
              </>
            }
          </ColBlock>
          <ColBlock className={tabBlockClasses}>
            <Col>
              <MainHeader className='fs-1'>{title}</MainHeader>
              <MainHeader className='fs-6'>{altTitles.join(' | ')}</MainHeader>
            </Col>
            <Col>
              <TitleTabs
                mangaId={mangaId} desc={desc} tags={tags}
                relationships={relationships} titleInfoAttr={titleInfoAttr}
              />
            </Col>
          </ColBlock>
        </Row>
        {isAdaptiveView && <ReadingButtonsBlock isAdaptiveView />}
      </Container>
    );
  }
};

export default Title;
