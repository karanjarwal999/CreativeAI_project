import axios from "axios";


export async function Request_Convert_Code({ target_language, current_language, code, api_key, setOutput, ShowToast }) {

  if (!code) { ShowToast('NO Code Found', "Please write some code first"); return }
  setOutput("Converting....");

  // making request to the server
  try {
    let res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/convert_code`, {
      target_language,
      current_language,
      code,
      api_key,
    });
    setOutput(res.data.Response);
  } catch (error) {
    setOutput(`Error: ${error.message}`);
  }
}


export async function Request_Debug_Code({ target_language, current_language, code, api_key, setOutput, ShowToast }) {

  if (!code) { ShowToast('NO Code Found', "Please write some code first"); return }
  setOutput("Debuging.... please wait...");

  // making request to the server
  try {
    let res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/debug_code`, {
      current_language,
      code,
      api_key,
    });
    setOutput(res.data.Response);
  } catch (error) {
    setOutput(`Error: ${error.message}`);
  }
}


export async function Request_QualityCheck({ target_language, current_language, code, api_key, setOutput, ShowToast }) {

  if (!code) { ShowToast('NO Code Found', "Please write some code first"); return }
  setOutput("Performing Quality check....");

  // making request to the server
  try {
    let res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/check_quality`, {
      current_language,
      code,
      api_key,
    });
    setOutput(res.data.Response);
  } catch (error) {
    setOutput(`Error: ${error.message}`);
  }
}




export async function Request_CSS({code,api_key,setOutput,ShowToast}) {

  if (!code) {
    ShowToast("NO Code Found", "Please write some code first");
    return 
  }
  setOutput("converting your code...");

  // making request to the server
  try {
    let res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/css_prefixer`, {
      code,
      api_key,
    });
    setOutput(res.data.Response);
  } catch (error) {
    setOutput(`Error: ${error.message}`);
  }
}


export async function Fetch_Code_From_Repo({token, setCode, fetchData, ShowToast, Fetch_onClose}) {
  // validating data is not empty
  for (let value in fetchData) {
    if (!fetchData[value]) {
      ShowToast('All fileld are Required')
      return
    }
  }
  // making fetch request to github repo
  try {
    ShowToast('fetching code...');
    const url = `https://api.github.com/repos/${fetchData.repoOwner}/${fetchData.RepoName}/contents/${fetchData.FilePath}`;
    const res = await axios.get(url, {
      headers: {
        'Authorization': `token ${token.token}`
      }
    });

    ShowToast('Data fetched successfully')
    setCode(res.data.content ? atob(res.data.content) : null)
    Fetch_onClose()
  } catch (error) {
    ShowToast(error.message);
  }
}


export async function Push_Code_To_Repo({token, PushData, ShowToast, output, Push_onClose}) {
  // validating push data
  for (let value in PushData) {
    if (!PushData[value]) {
      ShowToast('All fileld are Required')
      return
    }
  }
  // making fetch request to github repo
  try {
    ShowToast('pushing code...');

    // the file is already exist,if it then taking its data
    const url = `https://api.github.com/repos/${PushData.repoOwner}/${PushData.RepoName}/contents/${PushData.FilePath}`;
    const res = await axios.get(url, {
      headers: {
        'Authorization': `token ${token.token}`
      }
    });
    const sha = res.data.sha
    const repoData = res.data.content ? atob(res.data.content) : null

    ShowToast('Camparing code...');
    // encoding the content
    const encodedContent = btoa(output);

    const response = await axios.put(url, {
      message: PushData.CommitMessage,
      content: encodedContent,
      sha: sha
    }, {
      headers: {
        'Authorization': `token ${token.token}`,
        'Content-Type': 'application/json'
      }
    });

    ShowToast('code pushed successfully');
    Push_onClose()

  } catch (error) {
    console.log(error)
    ShowToast(error.message);
  }
}