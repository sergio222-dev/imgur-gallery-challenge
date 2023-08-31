import { PropsWithChildren } from "react";
import { AppBar as AppBarMui, Button, FormControlLabel, MenuItem, Select, Switch, Toolbar } from "@mui/material";
import styles from "./AppBar.module.scss";
import { nextPage, prevPage, setSection, setSort, setWindow, toggleViral } from "@/lib/image/application/adapter/slice";
import { fetchGallery } from "@/lib/image/application/adapter/slice/image.thunks";
import { useDispatch, useSelector } from "@/lib/shared/application/adapter";
import { sortOptions, windowOptions } from "@/lib/shared/domain/types/utils";

export default function AppBar({children}: PropsWithChildren) {
  const dispatch = useDispatch();
  const viral = useSelector(state => state.image.viral);
  const windowFilter = useSelector(state => state.image.window);
  const sort = useSelector(state => state.image.sort);
  const selectedSection = useSelector(state => state.image.selectedSection);
  const page = useSelector(state => state.image.page);
  const pages = useSelector(state => state.image.pages);
  const window = useSelector(state => state.image.window);
  const windowOptionsSelect: Array<{ label: string, value: windowOptions }> = [
    {
      label: 'Day',
      value: 'day'
    },
    {
      label: 'Week',
      value: 'week'
    },
    {
      label: 'Month',
      value: 'month'
    },
    {
      label: 'Year',
      value: 'year'
    },
    {
      label: 'All',
      value: 'all'
    }
  ];
  const sortOptionsSelect: Array<{ label: string, value: sortOptions }> = [
    {
      label: 'Time',
      value: 'time'
    },
    {
      label: 'Viral',
      value: 'viral'
    },
    {
      label: 'Top',
      value: 'top'
    },
    {
      label: 'Rising',
      value: 'rising'
    }
  ]


  const setHotSection = () => {
    dispatch(setSection('hot'));
    dispatch(fetchGallery({
      option: 'hot',
      viral,
      sort,
      window: windowFilter,
    }));
  }

  const setTopSection = () => {
    dispatch(setSection('top'));
    dispatch(fetchGallery({
      option: 'top',
      viral,
      sort,
      window: windowFilter,
    }));
  }

  const setUserSection = () => {
    dispatch(setSection('user'));
    dispatch(fetchGallery({
      option: 'user',
      viral,
      sort,
      window: windowFilter,
    }));
  }

  const nextPageClick = () => {
    dispatch(nextPage());
  }

  const prevPageClick = () => {
    dispatch(prevPage());
  }

  const toggleViralClick = () => {
    dispatch(fetchGallery({viral: !viral, option: selectedSection, sort, window: windowFilter}));
    dispatch(toggleViral());
  }

  const setWindowClick = (value: windowOptions) => {
    dispatch(setWindow(value));
    dispatch(fetchGallery({viral, option: selectedSection, sort, window: value}));
  }

  const setSortClick = (value: sortOptions) => {
    dispatch(setSort(value));
    dispatch(fetchGallery({viral, option: selectedSection, sort: value, window: windowFilter}));
  }

  return (
    <AppBarMui component="nav" className={ styles['appbar'] }>
      <Toolbar className={ styles['toolbar'] }>
        <div className={ styles['left-button-container'] }>
          <div>
            <Button onClick={ setHotSection } variant="contained"
                    data-selected={ selectedSection === 'hot' ? "true" : "false" }
                    className={ styles['button'] }>Hot</Button>
            <Button onClick={ setTopSection } variant="contained"
                    data-selected={ selectedSection === 'top' ? "true" : "false" }
                    className={ styles['button'] }>Top</Button>
            <Button onClick={ setUserSection } variant="contained"
                    data-selected={ selectedSection === 'user' ? "true" : "false" }
                    className={ styles['button'] }>User</Button>
          </div>

          { selectedSection === 'user' && (
            <div>
              <FormControlLabel
                className="p-4"
                control={
                  <Switch
                    color="success"
                    size="small"
                    checked={ viral }
                    onChange={ toggleViralClick }
                  /> }
                label="Viral"/>
            </div>
          ) }
          <div>
            { selectedSection === 'top' && (
              <Select
                classes={ {
                  root: styles['select'],
                  icon: styles['icon'],
                } }
                value={ window }
                onChange={ (e) => setWindowClick(e.target.value as windowOptions) }>
                { windowOptionsSelect.map((option) => (
                  <MenuItem key={ option.value } value={ option.value }>{ option.label }</MenuItem>
                )) }
              </Select>
            ) }
            { selectedSection === 'user' && (
              <Select
                classes={ {
                  root: styles['select'],
                  icon: styles['icon'],
                } }
                value={ sort }
                onChange={ (e) => setSortClick(e.target.value as sortOptions) }>
                { sortOptionsSelect.map((option) => (
                  <MenuItem key={ option.value } value={ option.value }>{ option.label }</MenuItem>
                )) }
              </Select>
            ) }
          </div>
        </div>

        <div>
          <Button className={ `${styles['button']} ml-4 mr-4` } onClick={ prevPageClick } variant="contained">Previous</Button>
          { page }/{ pages }
          <Button className={`${styles['button']} ml-4 mr-4` } onClick={ nextPageClick } variant="contained">Next</Button>
        </div>


      </Toolbar>
    </AppBarMui>
  )
}
