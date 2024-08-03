import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useLanguageForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const Language: FunctionComponent = () => {

  const navigate = useNavigate()

  const { languageId } = useParams() as { languageId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useLanguageForm({
    languageId,
    onCreated: (data) => {
      navigate(`${compendiumPath}/systems/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/systems`)
    },
  })

  return (
    <Post
      pageTypeName={'Language'}
      form={form}
    />
  )
}

export default Language
