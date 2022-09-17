export async function search(query) {
  try {
    const data = await fetch(
      `https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword=${query}`,
    );
    const json = await data.json();

    return json;
  } catch (error) {
    console.error(error);
  }
}
