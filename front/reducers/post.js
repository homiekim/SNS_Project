export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초",
      },
      content: "첫 번째 게시글 #테스트 #프로필",
      Images: [
        {
          src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "우와 개정판이 나왔군요~",
        },
        {
          User: {
            nickname: "hero",
          },
          content: "얼른 사고싶어요~",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading : false,
  addPostDone : false,
  addPostError : null,
  postAdded: false,
};

const dummyPost = {
    id: 2,
    content: "더미데이터입니다.",
    User: {
      id: 1,
      nickname: "제로초",
    },
    Images: [],
    Comments: [],
};

// 액션 타입 정의
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

// 액션 함수 정의
export const addPost = (data)=>{
    return {
      type: ADD_POST_REQUEST,
      data
    }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        addPostLoading : true,
        addPostDone : false,
        addPostError : null,
      };
    case ADD_POST_SUCCESS :
      return {
        ...state,
        addPostLoading : false,
        addPostDone : true,
        mainPosts : [dummyPost, ...state.mainPosts]
      }
    case ADD_POST_FAILURE :
      return {
        addPostLoading : false,
        addPostError : action.error
      }
    default:
      return state;
  }
};

export default reducer;
