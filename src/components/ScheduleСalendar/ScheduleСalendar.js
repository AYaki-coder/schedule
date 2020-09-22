import React, {useState} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Calendar, Badge, Drawer} from 'antd';
import {setTagStyle} from '../../utils';
import ScheduleСalendarDrawer from './ScheduleCalendarDrawer';
import './schedule-calendar.css';

const connector = connect(state => ({
  style: state.styles,
}));

const ScheduleСalendar = ({events, style}) => {
  const [drawer, setDrawer] = useState({visible: false});
  const [dayEvents, setDayEvents] = useState(0);

  const drawerDate = dayEvents ? moment(dayEvents[0].dateTime).format('MMMM Do') : 0;

  const showDrawer = value => {
    setDrawer({visible: true});
    setDayEvents(value);
  };
  const hiderDrawer = () => {
    setDrawer({visible: false});
  };
  const getListData = value => {
    const listDatabyYear = events.filter(
      el => moment(el.dateTime).format('Y') === value.format('Y')
    );
    const listDatabyMonth = listDatabyYear.filter(
      el => moment(el.dateTime).format('D') === value.format('D')
    );
    const listDatabyDay = listDatabyMonth.filter(
      el => moment(el.dateTime).format('M') === value.format('M')
    );
    return listDatabyDay;
  };
  const setStyle = item => {
    return {
      background: setTagStyle(item.type, style).background,
      color: setTagStyle(item.type, style).color,
    };
  };
  const dateCellRender = value => {
    const listData = getListData(value);
    return (
      <div
        className="events"
        onClick={() => {
          showDrawer(listData);
        }}
      >
        <div>
          <Badge
            size="small"
            style={{backgroundColor: '#108ee9'}}
            className="event-counter"
            count={listData.length}
          />
          {listData.map(item => (
            <div className="event-box" key={item.id} style={setStyle(item)}>
              {item.type}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <Calendar dateCellRender={dateCellRender} />
      <Drawer
        title={drawerDate}
        placement="bottom"
        closable={false}
        onClose={hiderDrawer}
        visible={drawer.visible}
      >
        <ScheduleСalendarDrawer dayEvents={dayEvents} />
      </Drawer>
    </div>
  );
};

export default connector(ScheduleСalendar);
