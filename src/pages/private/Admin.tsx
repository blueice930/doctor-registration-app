import React, {
  useState, useCallback,
} from 'react';
import {
  Button, CircularProgress,
  Grid, Paper, TextField, Typography,
} from '@mui/material';
import { toNumber } from 'lodash';

const AdminPage = () => {
  const [packageId, setPackageId] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleBtnOnClick = useCallback(async () => {
    try {
      console.log('btn clicked');
    } catch (e:any) {
      console.log('e', e);
    }
  }, []);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleBtnOnClick();
    }
  };

  return (
    <div >
      Admin page
    </div>
  );
};

export default AdminPage;
