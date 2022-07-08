import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Carousel, Spinner } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import Reader from '../../components/ChapterReader/Reader';
import CONSTANTS from '../../constants';
import InfoPanel from '../../components/ChapterReader/InfoPanel';
const { PARAM_NAME: { page } } = CONSTANTS;

const ChapterReader = () => {
  const { theme } = useSelector(({ themes }) => themes);
  const { chapterId } = useParams();
  
  const { chapterPages, isFetching } = useSelector(({ chapterPages }) => chapterPages);
  const { getChapterPages } = bindActionCreators(actionCreators, useDispatch());
  
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number.parseInt(searchParams.get(page)) - 1 || 0);

  useEffect(() => {
    const hideFooterIds = ['root', 'content', 'footer'];
    hideFooterIds.forEach((id) => document.getElementById(id).classList.add('disable-footer'));
    document.getElementById('header').classList.add('static-header');
    return () => {
      hideFooterIds.forEach((id) => document.getElementById(id).classList.remove('disable-footer'));
      document.getElementById('header').classList.remove('static-header');
    };
  }, [theme]);

  useEffect(() => getChapterPages({ chapterId }), [chapterId]);

  useEffect(() => {
    const paramValue = searchParams.get(page);
    if (paramValue) {
      setCurrentPage(Number.parseInt(paramValue) - 1);
    } else{
      setCurrentPage(0);
    }
  }, [searchParams]);

  return (
    (isEmpty(chapterPages.data) || isFetching)
      ? <Spinner animation='border' role='status'></Spinner>
      : <Container fluid>
        <Row className='p-5'>
          <InfoPanel currentPage={currentPage} pageCount={chapterPages.data.length}/>
        </Row>
        <Row>
          <Col>
            <Reader chapterPages={chapterPages} currentPage={currentPage} />
          </Col>
        </Row>
      </Container>
  );
};

export default ChapterReader;
