import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { useLoading } from '../../hooks';
import { Container, Row, Button } from 'react-bootstrap';
import ColBlock from '../../components/Blocks/ColBlock';
import MainHeader from '../../components/Headers/MainHeader';
import Cover from '../../components/Title/Cover';
import ProfileTabs from './ProfileTabs';
import CONSTANTS from '../../constants';

const Profile = () => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  const { me, isFetching } = useSelector(({ me }) => me);
  const { token } = useSelector(({ auth }) => auth);
  const { getMe } = bindActionCreators(actionCreators, useDispatch());

  useEffect(() => {
    getMe({ token });
  }, []);

  const loading = useLoading({ data: me, isFetching });
  if (loading) return loading;

  return (
    <Container>
      <Row>
        <ColBlock className='col-12 col-lg-4 col-xxl-3'>
          <Cover
            image={me.avatar || CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_AVATAR}
            alt={me.name}
            className={'col-8 col-sm-6 m-auto'}
          />
          <Button
            variant={invertedColor}
            className='d-block w-100 pt-2 pb-2 text-uppercase'
          >
            Settings
          </Button>
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
