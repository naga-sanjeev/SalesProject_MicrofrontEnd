export const getUsersQuery =
  `query {
  getUsers {
    userName
    password
  }
}`

export const loginUserQuery =
  `mutation ($userName: String!, $password: String!) {
  userLogin(userName: $userName, password: $password)
  {
  userId,
  name,
  role,
  email,
  userName,
  reportsTo
  }}`

export const industryDropdownQuery =
  "query { getIndustries { industryId name } }"

export const practicesDropdownQuery =
  `query {
    getPractices {
    practiceId,
    name
    }
    }`

export const accountDropdownQuery =
  `query{
    getAccounts {
    accountId
    accountType
    }
    }`

export const menuItemsQuery =
  `query{getMenu {menuId,role,screens}}`

export const addNewClientQuery =
  `mutation CreateProject($input: ProjectsInput!) {
  createProject(input: $input) {
  clientName
  industryType
  practiceName
  requirement
  date
  conversation
  pointOfContact
  submittedBy
  role
  name
  reportsTo
  }
  }`

export const userRoleQuery: any =
{
  query:
    'query($userRole: String!) { getProjectsTableData(role: $userRole) { projectId clientName industryType practiceName submittedBy role projectName accountType status technology description startDate endDate architecture} }',
  variables: {
    userRole: 'Project Manager',
  },
};

export const userQuery: any =
  "query($username: String!) { getMyActivitiesOfUser(username: $username) { projectId clientName industryType practiceName submittedBy role projectName accountType status technology description architecture startDate endDate name createdAt} }"


export const reportsToQuery: any =
  `query($reportsTo: String!) {
  getMyTeamActivities(reportsTo: $reportsTo)
  {
  projectId
  clientName
  industryType
  practiceName
  submittedBy
  role
  requirement
  date
  conversation
  pointOfContact
  name
  }
  }`

export const statusDropdown: any =
  'query { getStatus { statusId status } }'


export const myActivities: any =
  "query($username: String!) { getMyActivitiesOfUser(username: $username) { projectId clientName industryType practiceName submittedBy role requirement date conversation pointOfContact createdAt name architecture} }"

export const managerMyActivitiesQuery: any =
  `query($username: String!) { getMyActivitiesOfUser(username: $username) { projectId clientName industryType practiceName submittedBy role projectName accountType status technology description startDate endDate createdAt name architecture}}`

export const addExistingQuery: any = `mutation CreateProject($input: ProjectsInput!) {
  createProject(input: $input) {
  clientName
 projectName
 industryType 
 accountType
 practiceName 
 technology 
 startDate 
 endDate 
 status 
 description 
 reportsTo
 role 
 submittedBy
 name
 projectId
 architecture
  }
}`;

export const deleteQuery: any =
  `mutation ($projectId: Int!) { deleteProject(projectId: $projectId) }`;

export const historyQuery: any =
  `query ($project_Id: Float!) { 
    getProjectsHistoryByProjectId(project_Id: $project_Id) 
    { 
      historyId, 
      project_Id, 
      actions, 
      submittedBy, 
      createdAt 
    } 
  }`

export const projectNameQuery: any =
  "query { getProjects { projectId projectName } }"

export const editExisitingProjectQuery: any = `mutation EditMyActivity($projectId: Float!, $input: ProjectsInput!) {
  editMyActivity(projectId: $projectId, input: $input) {
    projectId
    clientName
    name
    industryType
    practiceName
    submittedBy 
    role 
    reportsTo 
    projectName 
    accountType 
    status 
    technology 
    description 
    startDate 
    endDate
    architecture
  }
}`

export const salesTraineeEditExisitingProjectQuery: any = `mutation EditMyActivity($projectId: Float!, $input: ProjectsInput!) {
  editMyActivity(projectId: $projectId, input: $input) {
  projectId
  clientName 
  industryType 
  practiceName
  submittedBy
  role
  reportsTo
  requirement
  date
  conversation
  pointOfContact
  name
 }}`


