//
// * blob(Binary Large Object data)
/**
 * asset => Blob 데이터로 변환
 * @param uri  Image uri 데이터
 * @returns blob 데이터
 */
export const assetToBlob = async (uri: string) => {
  //1. network fetch를 사용해서 정보를 받아온다
  const respone = await fetch(uri);
  //2. 정보 중에 blob 데이터를 뽑아냅니다.
  const blob = respone.blob();
  //3. 뽑아낸 blob 데이터를 반환
  return blob;
};

/**
 * Uri가 없는 경우 기본 이미지값을 return
 * @param uri  띄워주고 싶은 이미지 URI
 * @return require()
 */
export const defaultImage = (uri: string | undefined | null) => {
  //a. uri 가 존재하는 경우
  if (uri) {
    return { uri };
  }
  //b. uri 가 존재하지 않는 경우
  else {
    return require("../assets/icon.png");
  }
};
