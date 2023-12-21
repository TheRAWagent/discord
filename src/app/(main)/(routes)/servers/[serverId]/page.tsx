// import {}
type props={
  params: {serverId: string}
}

const page = ({params}: props): JSX.Element => {
  return (
    <div>Server ID {params.serverId   }</div>
  )
}

export default page;