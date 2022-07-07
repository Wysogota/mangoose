import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Carousel, Spinner } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import styles from './ChapterReader.module.scss';
import './reader.scss';
import CONSTANTS from '../../constants';
const { PARAM_NAME: { page } } = CONSTANTS;

const ChapterReader = () => {
  const { theme } = useSelector(({ themes }) => themes);
  const { chapterPages, isFetching } = useSelector(({ chapterPages }) => chapterPages);
  const { getChapterPages } = bindActionCreators(actionCreators, useDispatch());
  const { chapterId } = useParams();
  useEffect(() => getChapterPages({ chapterId }), [chapterId]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number.parseInt(searchParams.get(page)) || 0);

  useEffect(() => {
    const hideFooterIds = ['root', 'content', 'footer'];
    hideFooterIds.forEach((id) => document.getElementById(id).classList.add('disable-footer'));
    document.getElementById('header').classList.add('static-header');
    return () => {
      hideFooterIds.forEach((id) => document.getElementById(id).classList.remove('disable-footer'));
      document.getElementById('header').classList.remove('static-header');
    };
  }, [theme]);

  const handleSelect = (selectedPage) => {
    setCurrentPage(selectedPage);
    setSearchParams(`?page=${selectedPage}`);
  };

  return (
    <Container fluid>
      <Row>
        <Col className='p-5'>
        </Col>
      </Row>
      <Row>
        <Col>
          {(isEmpty(chapterPages.data) || isFetching)
            ? <Spinner animation='border' role='status'></Spinner>
            :
            <Carousel id='reader'
              interval={null} indicators={false} nextIcon={null} prevIcon={null}
              activeIndex={currentPage} onSelect={handleSelect}
            >
              {chapterPages.data.map(((image, i) =>
                <Carousel.Item key={i}>
                  <img
                    className={styles.image}
                    src={`https://uploads.mangadex.org/data/${chapterPages.hash}/${image}`}
                    alt="First slide"
                  />
                </Carousel.Item>
              ))}
            </Carousel>}
        </Col>
      </Row>
    </Container>
  );
};

export default ChapterReader;
