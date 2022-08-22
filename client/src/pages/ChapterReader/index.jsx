import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import InfoPanel from '../../components/ChapterReader/InfoPanel';
import Reader from '../../components/ChapterReader/Reader';
import { getPageTitle, selectRelationship } from '../../common/functions';
import CONSTANTS from '../../constants';
const { PARAM_NAME: { PAGE }, DEFAULT_LOCALE } = CONSTANTS;

const ChapterReader = () => {
  const { chapterId } = useParams();

  const { theme } = useSelector(({ themes }) => themes);
  const { chapterPages, isFetching } = useSelector(({ chapterPages }) => chapterPages);
  const { chapter } = useSelector(({ chapter }) => chapter);
  const { getChapterPages } = bindActionCreators(actionCreators, useDispatch());
  const { getChapter } = bindActionCreators(actionCreators, useDispatch());

  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number.parseInt(searchParams.get(PAGE)) - 1 || 0);

  useEffect(() => {
    if (!isEmpty(chapter)) {
      const mangaTitle = selectRelationship(chapter.relationships, 'manga').attributes.title[DEFAULT_LOCALE];
      const chapterTitle = chapter.attributes.title;
      document.title = chapterTitle
        ? getPageTitle(`${chapterTitle} - ${mangaTitle}`)
        : getPageTitle(mangaTitle);
    }
  }, [chapter]);

  useEffect(() => {
    getChapter({ chapterId });
    getChapterPages({ chapterId });
  }, [chapterId]);

  useEffect(() => {
    const paramValue = searchParams.get(PAGE);
    const parsedPage = Number.parseInt(paramValue) - 1;
    setCurrentPage(paramValue ? parsedPage : 0);
  }, [searchParams]);

  useEffect(() => {
    const hideFooterIds = ['root', 'content', 'footer'];
    hideFooterIds.forEach((id) => document.getElementById(id).classList.add('disable-footer'));
    document.getElementById('header').classList.add('static-header');
    return () => {
      hideFooterIds.forEach((id) => document.getElementById(id).classList.remove('disable-footer'));
      document.getElementById('header').classList.remove('static-header');
    };
  }, [theme]);


  if (isEmpty(chapterPages) || isFetching) {
    return <Spinner animation='border' role='status' />;
  }

  return (
    <Container fluid>
      <Row className='pb-5 pt-5'>
        <InfoPanel currentPage={currentPage} />
      </Row>
      <Row>
        <Col>
          <Reader currentPage={currentPage} />
        </Col>
      </Row>
    </Container>
  );
};

export default ChapterReader;
