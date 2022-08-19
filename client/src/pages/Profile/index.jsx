import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Button } from 'react-bootstrap';
import ColBlock from '../../components/Blocks/ColBlock';
import MainHeader from '../../components/Headers/MainHeader';
import Avatar from '../../components/Avatar';
import ProfileTabs from './ProfileTabs';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../constants';
const { PAGES: { SETTINGS: { path: SETTINGS_PATH } } } = CONSTANTS;


const Profile = () => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  const { me } = useSelector(({ me }) => me);

  return (
    <Container>
      <Row>
        <ColBlock className='col-12 col-lg-4 col-xxl-3'>
          <Avatar className='mb-3 d-block m-auto' />
          <div className='pt-3'>
            <Button variant={invertedColor} className='w-100 mb-3 p-0'>
              <Link to={SETTINGS_PATH} className='d-block w-100 pt-2 pb-2 text-uppercase'>Settings</Link>
            </Button>
          </div>
        </ColBlock>
        <ColBlock className='col-12 col-lg-8 col-xxl-9'>
          <MainHeader>{me.name}</MainHeader>
          <ProfileTabs />
        </ColBlock>
      </Row>
    </Container>
  );
};

export default Profile;
