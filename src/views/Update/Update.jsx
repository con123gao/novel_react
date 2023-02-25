import React, { useState } from "react";
import NavBarAgain from '../../components/NavBarAgain/NavBarAgain';
import ButtonAgain from '../../components/ButtonAgain/ButtonAgain';
import styled from "styled-components";
import { ImageUploader, Input, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import action from '../../store/action';
import api from '../../api';
import { demoSrc, mockUpload, mockUploadFail } from './utils';

/* 样式 */
const UpdateBox = styled.div`
    .formBox {
        padding: 30px;

        .item {
            display: flex;
            align-items: center;
            height: 110px;
            line-height: 110px;
            font-size: 28px;

            .label {
                width: 20%;
                text-align: center;
            }

            .input {
                width: 80%;
            }
        }
    }

    .submit {
        display: block;
        margin: 0 auto;
        width: 60%;
        height: 70px;
        font-size: 28px;
    }
`;

const Update = function Update(props) {
  let { info, queryUserInfoAsync, navigate } = props;
  /* 定义状态 */
  let [pic, setPic] = useState([{ url: info.avatar }]),
    [userName, setUserName] = useState(info.userName);

  /* 图片上传 */
  const limitImage = (file) => {
    let limit = 1024 * 1024;
    if (file.size > limit) {
      Toast.show({
        icon: 'fail',
        content: '图片须在1MB内'
      });
      return null;
    }
    return file;
  };
  const uploadImage = async (file) => {
    let temp;
    try {
      let { code, data: pic } = await mockUpload(file);
      console.log(code,pic);
      if (+code !== 200) {
        Toast.show({
          icon: 'fail',
          content: '上传失败'
        });
        return;
      }else {
        Toast.show({
          icon: 'success',
          content: '头像更改成功'
        });
      }
      temp = pic;
      setPic([{
        url: pic
      }]);
    } catch (_) { }
    queryUserInfoAsync();//同步redux中的信息
    return { url: temp };
  };

  /* 提交信息 */
  const submit = async () => {
    // 表单校验
    if (userName.trim() === "") {
      Toast.show({
        icon: 'fail',
        content: '请先输入账号'
      });
      return;
    }
    // 获取信息，发送请求
    try {
      let { code } = await api.updateUser(info.id,userName.trim());
      if (+code !== 200) {
        Toast.show({
          icon: 'fail',
          content: '修改信息失败'
        });
        return;
      }
      Toast.show({
        icon: 'success',
        content: '修改信息成功'
      });
      queryUserInfoAsync();//同步redux中的信息
      navigate(-1);
    } catch (_) { }
  };

  return <UpdateBox>
    <NavBarAgain title="修改信息" />
    <div className="formBox">
      <div className="item">
        <div className="label">头像</div>
        <div className="input">
          <ImageUploader
            value={pic}
            maxCount={1}
            onDelete={() => {
              setPic([]);
            }}
            beforeUpload={limitImage}
            upload={uploadImage}
          />
        </div>
      </div>
      <div className="item">
        <div className="label">姓名</div>
        <div className="input">
          <Input placeholder='请输入账号名称'
            value={userName}
            onChange={val => {
              setUserName(val);
            }} />
        </div>
      </div>

      <ButtonAgain color='primary' className="submit"
        onClick={submit}>
        提交
      </ButtonAgain>
    </div>
  </UpdateBox>;
};
export default connect(
  state => state.base,
  action.base
)(Update);